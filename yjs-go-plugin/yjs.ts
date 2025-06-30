import * as Y from 'yjs'
import * as syncProtocol from 'y-protocols/sync'
import * as awarenessProtocol from 'y-protocols/awareness'

import * as encoding from 'lib0/encoding'
import * as decoding from 'lib0/decoding'
import * as map from 'lib0/map'

const messageSync = 0
const messageAwareness = 1

const docs = new Map<string, WSSharedDoc>()
// A map of origins to client IDs.
const originMap = new Map<string, number>()

class WSSharedDoc extends Y.Doc {

  awareness: awarenessProtocol.Awareness

  constructor () {
    super()

    this.awareness = new awarenessProtocol.Awareness(this)
    this.awareness.setLocalState(null)
  }
}

const getYDoc = (docname: string) => map.setIfUndefined(docs, docname, () => {
  const doc = new WSSharedDoc()
  return doc
})

export const syncV1 = (docname: string): Uint8Array => {
  const doc = getYDoc(docname)
  const encoder = encoding.createEncoder()
  encoding.writeVarUint(encoder, messageSync)
  // todo: documentation says we should write sync step 2 as well, but not
  // worth doing until we actually send partial updates and not syncUpdate()
  syncProtocol.writeSyncStep1(encoder, doc)
  return encoding.toUint8Array(encoder)
}

export const awarenessUpdate = (docname: string): Uint8Array => {
    const doc = getYDoc(docname)
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, messageAwareness)
    encoding.writeVarUint8Array(encoder, awarenessProtocol.encodeAwarenessUpdate(doc.awareness, Array.from(doc.awareness.getStates().keys())))
    return encoding.toUint8Array(encoder)
}

export const syncUpdate = (docname: string): Uint8Array => {
  const doc = getYDoc(docname)
  const encoder = encoding.createEncoder()
  // todo: this is pretty stupid, but for a POC seems fine
  const newUpdates = Y.encodeStateAsUpdate(doc)
  encoding.writeVarUint(encoder, messageSync)
  syncProtocol.writeUpdate(encoder, newUpdates)
  return encoding.toUint8Array(encoder)
}

export const removeClient = (docname: string, _: string[]) => {
    const doc = getYDoc(docname)
    // This would be ideal, but it's unclear how originMap should be populated
    // const clients = origins.map(origin => originMap.get(origin)).filter(clientID => clientID != undefined)
    awarenessProtocol.removeAwarenessStates(doc.awareness, Array.from(doc.awareness.getStates().keys()), "server")
}

export const websocketMessage = (docname: string, message: Uint8Array, origin: string): Uint8Array | undefined => {
  const doc = getYDoc(docname)
  try {
    const encoder = encoding.createEncoder()
    const decoder = decoding.createDecoder(message)
    const messageType = decoding.readVarUint(decoder)
    switch (messageType) {
      case messageSync:
        encoding.writeVarUint(encoder, messageSync)
        syncProtocol.readSyncMessage(decoder, encoder, doc, origin)

        // If the `encoder` only contains the type of reply message and no
        // message, there is no need to send the message. When `encoder` only
        // contains the type of reply, its length is 1.
        if (encoding.length(encoder) > 1) {
          return encoding.toUint8Array(encoder)
        }
        break
      case messageAwareness: {
        awarenessProtocol.applyAwarenessUpdate(doc.awareness, decoding.readVarUint8Array(decoder), origin)
        break
      }
    }
  } catch (err) {
    console.error(err)
    // doc.emit('error', [err])
  }
}
