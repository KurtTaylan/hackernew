import React, {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import Link from './Link'

class LinkList extends Component {
    render() {

        // 1 Loading case
        if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
            return <div>Loading</div>
        }

        // 2 Error case
        if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
            return <div>Error</div>
        }

        // 3 
        const linksToRender = this.props.allLinksQuery.allLinks;
        return (
            <div>
                {linksToRender.map((link, index) => (< Link key = {link.id} updateStoreAfterVote={this._updateCacheAfterVote} index= {index} link = {link} />))}
            </div>
        )
    }

    _updateCacheAfterVote = (store, createVote, linkId) => {
        // 1 reading current state of cached data for query 
        const data = store.readQuery({ query: ALL_LINKS_QUERY })
        
        // 2 retrieving changed link from response 
        const votedLink = data.allLinks.find(link => link.id === linkId)
        votedLink.votes = createVote.link.votes
        
        // 3 write it back into the store
        store.writeQuery({ query: ALL_LINKS_QUERY, data })
      }
}

// 1
export const ALL_LINKS_QUERY = gql `
   # 2
   query AllLinksQuery {
       allLinks {
           id
           createdAt
           url
           description
           postedBy {
               id 
               name
           }
           votes {
               id
               user {
                   id
               }
           }
       }
   }
`
// 3
export default graphql(ALL_LINKS_QUERY, {name: 'allLinksQuery'})(LinkList)