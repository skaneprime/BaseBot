import React, { Component } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';

export default class index extends Component {
    constructor({ membersChunk }) {
        super();

        this.state = {
            pageNumber: 0,
            membersChunk: membersChunk,
            CurrentPage: membersChunk[0],
            scrollParentRef: null
        };
    }
    render() {
        console.log(this.state)

        return (
            <div id="scrollableDiv" ref={(ref) => this.scrollParentRef = ref} style={{ marginLeft: "200px", height: "800px", overflow: "auto"}}>
                
            </div>
        )
    }
}


// <InfiniteLoader
//     dataLength={this.state.membersChunk.length}
//     next={() => {
//         let NewCurrentPage = this.state.CurrentPage;
//         this.state.membersChunk[this.state.pageNumber+1].forEach((JSX_member, i) => {
//             NewCurrentPage.push(JSX_member);
//             if(i === this.state.membersChunk[this.state.pageNumber+1].length-1) {
//                 console.log('UPDAYERR')
//                 this.setState(prevState =>({
//                         ...prevState,
//                         pageNumber: prevState.pageNumber+=1,
//                         CurrentPage: NewCurrentPage
//                 }))
//             }
//         })
//     }}
//     hasMore={true}
//     loader={<div className="loader" key={0}>Loading...</div>}
//     endMessage={
//         <p style={{textAlign: 'center'}}>
//             <b>Yay! You have seen it all</b>
//         </p>
//     }
//     scrollableTarget="scrollableDiv"
// >
//     {this.state.CurrentPage}
// </InfiniteLoader>