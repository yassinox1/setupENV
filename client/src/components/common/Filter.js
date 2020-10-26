import React,{useContext,useState} from "react";
import ProductContext from "../../context/product/ProductContext"
const Filter = () => {
  
  const {getHotProductsByTitile} =  useContext(ProductContext);
  const [text,setText] = useState('')

  const getHotTitle=()=>{
    getHotProductsByTitile(text)
  }
  return (
    <div className="container">
        <div class="row mt-2 mb-2">

              
<div class="col-lg-6 col-sm-12">
  <div class="input-group mb-5">
  <input type="text" id="productSearch" class="form-control" value={text} placeholder="Search..." onChange={(e)=>setText(e.target.value)}/>
   <div class="input-group-append" id="SearchButtons">
  <button style={{background : '#5FBEAA',color:'#ffffff'}} class="btn btn-default " type="button" id="submitSearch" onClick={getHotTitle} ><i class="fa fa-search"></i></button>
  </div>
</div>                  </div> 

</div>
      <div class="form-row">
        <div class="col-md-3 mb-3">
          <select class="form-control form-control-sm">
            <option>All Categorie</option>
            <option>Automobile & Motorcucles</option>
            <option>Beauty & Health</option>
            <option>Consumer & lectronics</option>
            


          </select>
        </div>
        <div class="col-md-3 mb-3">
          <select class="form-control form-control-sm">
            <option>All Niches</option>
            <option>Automobile & Motorcucles</option>
            <option>Beauty & Health</option>
            <option>Consumer & lectronics</option>
            
          </select>
        </div>
        <div class="col-md-3 mb-3">
          <select class="form-control form-control-sm">
            <option>Filter Products</option>
            <option>Automobile & Motorcucles</option>
            <option>Beauty & Health</option>
            <option>Consumer & lectronics</option>
            
          </select>
        </div>
        <div class="col-md-3 mb-3">
          <select class="form-control form-control-sm">
            <option>Sort Products</option>
            <option>Automobile & Motorcucles</option>
            <option>Beauty & Health</option>
            <option>Consumer & lectronics</option>
            
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
