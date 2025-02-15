import React,{useState,useEffect} from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
};

function App() {
    const [name,setName] = useState('');
    const [list,setList] = useState(getLocalStorage());
    const [alert,setAlert] = useState({show:false,type:'',msg:''});
    const [isEditting,setIsEditting] = useState(false);
    const [editID,setEditID] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            showAlert(true,'danger','please enter a value')
        } else if (name && isEditting) {
            setList(list.map((item)=>{
                if (item.id === editID) {
                    return {...item,title:name};
                }
                return item;
            }))
            setName('');
            setIsEditting(false);
            setEditID(null);
            showAlert(true,'success','value changed')
        } else {
            showAlert(true,'success','item added to the list')
            const newItem = {id: new Date().getTime().toString(),title:name};
            setList([...list,newItem]);
            setName('')
        }
    };

    const showAlert = (show=false,type='',msg='') => {
        setAlert({show,type,msg});
    };

    const clearItems = () => {
        showAlert(true,'danger','empty list');
        setList([])
    };

    const removeItem = (id) => {
        showAlert(true,'danger','item removed');
        setList(list.filter((item)=>item.id !== id));
    };

    const editItem = (id) => {
        const specificItem = list.find((item)=>item.id === id);
        setName(specificItem.title);
        setIsEditting(true);
        setEditID(id);
    };

    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(list));
    },[list]);

    return (
        <section className="section-center">
            <form className="grocery-form" onSubmit={handleSubmit}>
                {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
                <h3>grocery bud</h3>
                <div className="form-control">
                    <input type="text" className="grocery" placeholder="Eg: Eggs" value={name} 
                    onChange={(e)=>setName(e.target.value)}/>
                    <button className="submit-btn" type="submit">
                        {isEditting ? 'edit' : 'submit'}
                    </button>
                </div>
            </form>
            {list.length > 0 && 
                <div className="grocery-container">
                    <List items={list} removeItem={removeItem} editItem={editItem}/>
                    <button className="clear-btn" onClick={clearItems}>
                        clear items
                    </button>
                </div>
            }
        </section>
    );
};

export default App;