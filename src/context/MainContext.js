import createDataContext from './createDataContext'
import {AsyncStorage} from 'react-native'

const mainReducer = (state,action) =>{
    switch (action.type){
        case 'fetch_books':
            return {...state,Books:action.payload}
                 
        default:
            return {...state}
    }
}

const fetchBooks = dispatch => async() =>{
    await AsyncStorage.getItem('BookName',(err,res)=>{
        if (err){
            console.log(err.message)
        }else{ 
            res = JSON.parse(res)
            dispatch({type:'fetch_books',payload:res})
        }
    })
}

const addBook = dispatch => async(bookName,authorName) =>{
    var bookArray = []
    await AsyncStorage.getItem('BookName',(err,res)=>{
        if (err){
            console.log(err.message)
        }else{
            bookArray = JSON.parse(res)
            if(res!=null){
                bookArray.push({BookName:bookName,Author:authorName,"Words":[]})
            }else{
                bookArray=[{BookName:bookName,Author:authorName,"Words":[]}]
            }
        }
    })
    await AsyncStorage.setItem('BookName',JSON.stringify(bookArray))  
}

const addWord = dispatch => async(bookName,wordName,meaning) =>{
    var bookArray = [];
    console.log(bookName,wordName,meaning)
    await AsyncStorage.getItem('BookName',(err,res)=>{
        if (err){
            console.log(err.message)
        }else{
            bookArray = JSON.parse(res)
            bookArray.forEach(element => {
                if(element.BookName==bookName){
                    let i = bookArray.indexOf(element)
                    bookArray[i].Words.push({Word:wordName,Meaning:meaning})
                }
            });
        }
    })
    await AsyncStorage.setItem('BookName',JSON.stringify(bookArray))  
}

export const { Context, Provider } = createDataContext(
    mainReducer,
    {
        fetchBooks,addBook,addWord
    },
    {Books:[], Words:[]}
)