import React from 'react';
import PostListItem from '../post-list-item/post-list-item'
import { ListGroup, ListGroupItem  } from 'reactstrap';
import './post-list.css'

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {
    
    const elements = posts.map((item) => {
       if(typeof(item) != 'object' || item == null){
           return '';
       }else{
        return (
            <ListGroupItem className="list-group-item" key={item.id}>
                 <PostListItem 
                         label={item.label} 
                         like={item.like}
                         important={item.important}
                         onDelete={() => onDelete(item.id)}
                         onToggleImportant={() => onToggleImportant(item.id)}
                         onToggleLiked={() => onToggleLiked(item.id)}
                 />
             </ListGroupItem>
         )
       }
       
    });
    
    
    return (
       
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
      
    )
}

export default PostList;