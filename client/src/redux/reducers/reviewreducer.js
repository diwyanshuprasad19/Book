const reducer =(state={},action)=>{
    if(action.type === 'reviewstore'){
      return action.payload;
    }
    else{
        return state;
    }
}

export default reducer;