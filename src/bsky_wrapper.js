import { BskyAgent } from "@atproto/api";

var agent;

export const bsky_login = async ({service: my_service, handle: my_handle, password: my_password})  => {
    agent = new BskyAgent({ service: my_service });
    
    try {
        await agent.login({
            identifier: my_handle,
            password: my_password
        });
        return true
    } catch (error) {
        return false
    }
}

export const bsky_get_handle = () => {
    return agent.session.handle
}

const RecordTypes = [
    "app.bsky.feed.post",
    "app.bsky.feed.repost",
    "app.bsky.feed.like",
    "app.bsky.graph.follow",
    "app.bsky.graph.block",
    "app.bsky.graph.listblock",
    "app.bsky.feed.generator",
    "app.bsky.graph.list"
]

export const bsky_clean = async ({
    posts:      posts,
    reposts:    reposts,
    likes:      likes,
    follows:    follows,

    blocks:     blocks,
    mutes:      mutes,
    blocklists: blocklists,
    mutelists:  mutelists,

    feeds:      feeds,
    userlists:  userlists,
    
    unfollowYourself: unfollowYourself,
    unblockYourself: unblockYourself,

}) => {
    if (posts) {
        await clearRecords(RecordTypes[0])
    }
    if (reposts) {
        await clearRecords(RecordTypes[1])
    }
    if (likes) {
        await clearRecords(RecordTypes[2])
    }
    if (follows) {
        await clearRecords(RecordTypes[3])
    }
    if (blocks) {
        await clearRecords(RecordTypes[4])
    }
    if (mutes) {
        await mute_cleaner()
    }
    if (blocklists) {
        await blocklist_cleaner()
    }
    if (mutelists) {
        await mutelist_cleaner()
    }
    if (feeds) {
        await clearRecords(RecordTypes[6])
    }
    if (userlists) {
        await userlist_cleaner()
    }
    if (unfollowYourself) {
        await clearRecord(RecordTypes[3])
    }
    if (unblockYourself) {
        await clearRecord(RecordTypes[4])
    }
}

const clearRecords = async (record_type) => {
    while (true) {
        var response = await agent.com.atproto.repo.listRecords({
            repo: agent.session.handle,
            collection: record_type,
            limit: 100,
        })
    
        if (response.data.records.length > 0) {
            for (let i = 0; i < response.data.records.length; i++) {
                let index = response.data.records[i].uri.lastIndexOf("/")
                let record_key = response.data.records[i].uri.slice(index + 1)
    
                await agent.com.atproto.repo.deleteRecord({
                    repo: agent.session.handle,
                    collection: record_type,
                    rkey: record_key
                })
            }
        } else {
            break
        }
    }
}

const mute_cleaner = async () => {
    let response = await agent.app.bsky.graph.getMutes();
    var len = response.data.mutes.length
    for (let i = 0; i < len; i++) {
        await agent.app.bsky.graph.unmuteActor({ actor: response.data.mutes[i].handle })
    }
}

const blocklist_cleaner = async () => {
    while (true) {
        let response = await agent.app.bsky.graph.getListBlocks();
        if (response.data.lists.length > 0) {
            for (let i = 0; i < response.data.lists.length; i++) {
                let index = response.data.lists[i].uri.lastIndexOf("/")
                let record_key = response.data.lists[i].uri.slice(index + 1)
                index = response.data.lists[i].viewer.blocked.lastIndexOf("/")
                let blocklist_record_key = response.data.lists[i].viewer.blocked.slice(index + 1)
    
                await agent.com.atproto.repo.deleteRecord({
                    repo: agent.session.handle,
                    collection: RecordTypes[7],
                    rkey: record_key
                })

                await agent.com.atproto.repo.deleteRecord({
                    repo: agent.session.handle,
                    collection: RecordTypes[5],
                    rkey: blocklist_record_key
                })
            }
        } else {
            break
        }
    }
}

const mutelist_cleaner = async () => {
    while (true) {
        let response = await agent.app.bsky.graph.getListMutes();
        if (response.data.lists.length > 0) {
            for (let i = 0; i < response.data.lists.length; i++) {
                let index = response.data.lists[i].uri.lastIndexOf("/")
                let record_key = response.data.lists[i].uri.slice(index + 1)
    
                await agent.com.atproto.repo.deleteRecord({
                    repo: agent.session.handle,
                    collection: RecordTypes[7],
                    rkey: record_key
                })
            }
        } else {
            break
        }
    }
}

const userlist_cleaner = async () => {
    var mycursor = ""
    while (true) {
        var response = await agent.com.atproto.repo.listRecords({
            repo: agent.session.handle,
            collection: RecordTypes[7],
            limit: 100,
            cursor: mycursor,
        })
        mycursor = response.data.cursor
    
        if (response.data.records.length > 0) {
            for (let i = 0; i < response.data.records.length; i++) {

                if (response.data.records[i].value.purpose == 'app.bsky.graph.defs#curatelist') {
                    let index = response.data.records[i].uri.lastIndexOf("/")
                    let record_key = response.data.records[i].uri.slice(index + 1)
        
                    await agent.com.atproto.repo.deleteRecord({
                        repo: agent.session.handle,
                        collection: RecordTypes[7],
                        rkey: record_key
                    })
                }
            }
        } else {
            break
        }
    }
}

const clearRecord = async (record_type) => {
    while (true) {
        var response = await agent.com.atproto.repo.listRecords({
            repo: agent.session.handle,
            collection: record_type,
            limit: 100,
        })

        if (response.data.records.length > 0) {
            for (let i = 0; i < response.data.records.length; i++) {
                if (response.data.records[i].value.subject == agent.session.did) {
                    let index = response.data.records[i].uri.lastIndexOf("/")
                    let record_key = response.data.records[i].uri.slice(index + 1)
    
                    await agent.com.atproto.repo.deleteRecord({
                        repo: agent.session.handle,
                        collection: record_type,
                        rkey: record_key
                    })
    
                    return
                }
            }

        } else {
            return
        } 
    }
}