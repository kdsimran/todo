import {useState, useEffect} from 'react';
import {BsPencilSquare, BsTrash3} from 'react-icons/bs';
import axios from 'axios';
import './Todo.css';

function Todo() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  //add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5500/api/item', {item: itemText})
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    }catch(err){
      console.log(err);
    }
  }

  //Create function to fetch all todo items from database -- we will use useEffect hook
  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:5500/api/items')
        setListItems(res.data);
        console.log('render')
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);

  // Delete item when click on delete
  const deleteItem = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems);
    }catch(err){
      console.log(err);
    }
  }

  //Update item
  const updateItem = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="btn btn-sm btn-block btn-outline-primary " type="submit">Update</button>
      <button className = "btn btn-sm btn-block btn-outline-primary" onClick={()=>{setIsUpdating('')}}>Cancel</button>
    </form>
  )

  return (
    <div className="Todo">
      <p class="h1" >My Todo List</p>
       <form className="mb-3 input-group" onSubmit={e => addItem(e)}>
        <input
          name="todo"
          className="form-control"
          placeholder="I'm going to..."
          value={itemText}
          onChange={e => {setItemText(e.target.value)}}
        />
        <button className="btn btn-primary">Add</button>
        {
          !!itemText && <button
            type="button"
            className="fa fa-times"
            style={{
              background: 'none',
              border: 'none',
              position: 'absolute',
              right: 40,
              top: 0,
              bottom: 0,
              marginRight: 20,
              zIndex: 10
            }}
            onClick={() => setItemText('')}
          />
        }
      </form>
      {/* <form className="form2" onSubmit={e => addItem(e)}>
        <input type="text" placeholder='Add Todo Item' onChange={e => {setItemText(e.target.value)} } value={itemText} />
        <button type="submit">Add</button>
      </form> */} 
       <div className="todo-listItems">
        {
          listItems.map(item => (
          <div className="card">
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>
                  <p className="card-body">{item.item}</p>
                  <div className='card-footer'>
                  <button className="btn btn-sm btn-block btn-outline-danger float-right" onClick={()=>{deleteItem(item._id)}}><BsTrash3/></button>
                  <button className="btn btn-sm btn-block btn-outline-primary float-right" onClick={()=>{setIsUpdating(item._id)}}><BsPencilSquare/></button>
                  </div>
                </>
            }
          </div>
          )) 
          }
        
      </div>
    </div>
  );
}

export default Todo;