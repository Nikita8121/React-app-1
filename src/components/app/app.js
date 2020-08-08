import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';
import { Container } from 'reactstrap';
import './app.css';



export default class App extends  Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn React', important:true, like:false,  id: 1},
                {label: 'That is so good', important:false, like:false, id:2},
                {label: 'I need a break', important:false, like:false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }
   
   deleteItem = (id) =>  {
        this.setState(({data}) => {
            const newArr = data.filter((item) => item.id !== id);
            return ({
                data: newArr 
            }
            )
        });
   }

   addItem = (body) => {
    const newItem = {
        label: body,
        important: false,
        id: this.maxId++
    }
    this.setState(({data}) => {
        const newArr = [...data, newItem];
        return ({
            data: newArr
        })
    })
   };

   onToggleImportant = (id) => {
    this.setState(({data}) => {
            const newArr= data.filter((item) => {
                if(item.id===id){
                    item.important  = !item.important;
                }
                return item;
            });
            
            return ({
                data: newArr
            });
        });
   }

   onToggleLiked = (id) => {
       this.setState(({data}) => {
        const newArr= data.filter((item) => {
            if(item.id===id){
                item.like  = !item.like;
            }
            return item;
        });
        
        return ({
            data: newArr
            })
         })
        }    
    

        searchPost = (items, term) => {
            if(term.length===0){
                return items;
            }

            return items.filter(item => {
                return item.label.indexOf(term) > -1;
            });
        }
        

        filterPost(items, filter){
            if(filter==='like'){
                return items.filter(item => item.like);
            }  else {
                return items;
            }
        }

        onFilterSelect = (filter) => {
            this.setState({filter});
        }

        onUpdateSearch = (term) => {
            this.setState({
                term: term
            })
        }

    render(){
        const liked = this.state.data.filter((item) => item.like).length;
        const allPosts = this.state.data.length;
        
        const visiblePosts = this.filterPost(this.searchPost(this.state.data,this.state.term), this.state.filter)

        return (
        <Container >
                <AppHeader
                liked={liked}
                allPosts={allPosts}
                />
                <div className="seaarch-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter onFilterSelect={this.onFilterSelect}  filter={this.state.filter}/>   
                </div>
                <PostList 
                posts={visiblePosts}
                onDelete={this.deleteItem }
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm
                onAdd={this.addItem}
                />
        </Container>
        )
    }
};

