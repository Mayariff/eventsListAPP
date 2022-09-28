import {itemType} from "./types";
import {create_id} from "../utils/create_id";

export const ArrangementList ={
    setStartDate(items: Array<itemType>){
        //для отображение первичный данных
        for(let i=0; i<items.length; i++){
            const id = items[i].id ? items[i].id: Date.now()+Math.floor(Math.random() * 100)
           if(!localStorage.getItem(JSON.stringify(id))) {
               localStorage.setItem(JSON.stringify(id), JSON.stringify(items[i]))
           }
        }
    },
    getAll():Array<itemType>{
        const res=[]
        for(let i=0; i<localStorage.length; i++) {
            const key = localStorage.key(i);
            if(key) {
                const value =localStorage.getItem(key)
                const item = value && JSON.parse(value)
                res.push(item);
            }
        }
        return res
    },
    get(id:number):itemType{
       const res =  localStorage.getItem(JSON.stringify(id))
        return res && JSON.parse(res)
    },
    add(model:Omit<itemType, "id">){
        const item={...model, id: create_id()}
        localStorage.setItem(JSON.stringify(item.id), JSON.stringify(item))
        if(localStorage.getItem(JSON.stringify(item.id))){
        return item.id
        }else{
            console.warn(`item doesn't add, try again `)
        }
    },
    update(item:itemType){
        localStorage.removeItem(JSON.stringify(item.id))
        localStorage.setItem(JSON.stringify(item.id), JSON.stringify(item))
    },
    remove(id:number){
        const key= JSON.stringify(id)
        localStorage.removeItem(key)
       if(localStorage.getItem(key)){
           console.warn(`item doesn't remove, try again `)
           return false
       }else{
           return true
       }
    }
}