window.onload=()=>{
    const key= `api_key=69525a4c4d3ed50bd6f7af5b199239e0`
    const base_url=`https://api.themoviedb.org/3`
    const posterbase=`https://image.tmdb.org/t/p/original`
    const popularmovies=base_url+`/discover/movie?sort_by_popularity.desc&`+key
    const searchurl=base_url+`/search/movie?`+key
    const generelisturl=base_url+`/genre/movie/list?`+key
    const pageurl=`https://api.themoviedb.org/3/discover/movie?sort_by_popularity.desc&api_key=69525a4c4d3ed50bd6f7af5b199239e0&page=`

    maindiv=document.querySelector("main")
    ratingdiv=document.querySelectorAll(".rating")
    searchform=document.querySelector("#searchform")
    searchinp=document.querySelector("#search")
    tagsdiv=document.querySelector("#tagscontainer")
    icondiv=document.querySelector("#icon")
    searchselectionbtn=document.querySelector("#searchselection")
    prevbtn=document.querySelector("#prev")
    nextbtn=document.querySelector("#next")
    curdiv=document.querySelector("#cur")
    let ttlpagesdiv=document.querySelector("#ttlpages")
    gotoinp=document.querySelector("#goto")
    gobtn=document.querySelector("#go")
    btmpgecontrolsdiv=document.querySelector("#btmpgecontrols")
    footerdiv=document.querySelector("footer")
    navseldiv=document.querySelector("#navsel")
    //Genre Pagenation Controls
    genreprevbtn=document.querySelector("#genreprev")
    genrenextbtn=document.querySelector("#genrenext")
    genrecurdiv=document.querySelector("#genrecur")
    let genrettlpagesdiv=document.querySelector("#genrettlpages")
    genregotoinp=document.querySelector("#genregoto")
    genregobtn=document.querySelector("#genrego")
    btmpgecontrolsdiv=document.querySelector("#btmpgecontrols")
    navseldiv=document.querySelector("#navsel")

    tagbtns=document.querySelectorAll(".tag")
    
    let selection=[]
    
    navseldiv.style.display="none"

    icondiv.onclick=()=>{
        curdiv.innerHTML='1'
        getmovie(popularmovies)
    }

//FETCH AND SHOW MOVIES START
    getmovie=(url)=>{
        maindiv.innerHTML=``
        fetch(url)
        .then(response => response.json())
      .then(data => {
        console.log(data)
       if(data.results.length!=0)
       {
        data.results.forEach(ele=>{
            /*
          console.log(ele.poster_path)
          console.log(ele.vote_average)
          console.log(ele.title)
          console.log(ele.overview)*/
         showmovies(ele.poster_path,ele.vote_average,ele.title,ele.overview)
       })
       }
       else
       {
        maindiv.innerHTML=`
        <div class="sorry"><h1>
        Sorry No results found clear selection and try again</h1></div>`
       }
       
      })
    }
    getmovie(popularmovies)
    
    showmovies=(pp,r,n,o)=>{
        let c= ''
        if(r>7)
        {
            c="green"
        }
        else if(r<7 & r>5)
        {
            c="orange"
        }
        else
        {
            c="red"
        }
        maindiv.innerHTML+=`
        <div class="movie">
        <img src="${pp?posterbase+pp:"https://upload.wikimedia.org/wikipedia/en/b/b7/Grand_Theft_Auto_IV_cover.jpg"}" alt="" class="movieimg">
        <div class="movieinfo">
            <b class="name">${n}</b>
            <span class="rating ${c}">${r}</span>
        </div>
        <div class="overview">
            <h3 class="overviewtitle">Overview:</h3>
            ${o}
            </div>
    </div>`
    }
//FETCH AND SHOW MOVIES END


//SEARCH MOVIE BY NAME START
   document.addEventListener("submit",(e)=>{
    e.preventDefault()
    getgenere(generelisturl)
    let findname=searchinp.value
    if(findname)
     {  
        //  maindiv.innerHTML=``
        getmovie(searchurl+`&query=`+findname)
    }
   }) 
//SEARCH MOVIE BY NAME END 
  

//GET GENERE AND FILTER BY GENERES START

   getgenere=(url)=>{
    tagsdiv.innerHTML=''
    fetch(url).then(res=>res.json())
    .then(data=>
        {   console.log(data.genres)
            data.genres.forEach(ele=>{
                showgenere(ele.name,ele.id)
            })
        })
   }
   getgenere(generelisturl)

   showgenere=(n,i)=>{
    
       tagsdiv.innerHTML+=`<button id="${i}" class="tag" onclick=changegenere(id)>${n}</button>`
   }

  changegenere=(id)=>{
    console.log(id)
    selection.push(id)
    let tempdiv=document.getElementById(id)
    tempdiv.style.backgroundColor="red"
}

clearselection=()=>
{   selection=[]
    getgenere(generelisturl)
    getmovie(popularmovies)
    footerdiv.style.display="block"
    navseldiv.style.display="none"
    curdiv.innerHTML='1'
}

getsearchselection=()=>
{
    
    sel= new Set(selection)
    sel=[...sel]
    res=sel.join(",")
    console.log(res)
    footerdiv.style.display="none"
    navseldiv.style.display="block"
    //getmovie(popularmovies+`&with_genres=`+encodeURI(res))
    return(popularmovies+`&with_genres=`+encodeURI(res))
   

}
searchselectionbtn.onclick=()=>
{
    genrecurdiv.innerHTML='1'
    getmovie(getsearchselection())
    let genrettlpages=fetch(getsearchselection()).then(res=>res.json())
.then(data=>{return data.total_pages})

printgenrepgs=async()=>{
   const res=await(genrettlpages)
   console.log(res)
   genrettlpagesdiv.innerHTML=`Total Pages: ${res}`
} 
printgenrepgs()
}
// searchselection=(url)=>
// {
//     getmovie(url)
// }
//GET GENERES AND FILTER BY GENERES END


//NORMAL PAGENATION START
if(curdiv.innerHTML=='1'||'0')
{
    prevbtn.style.display="none"
}

prevbtn.onclick=()=>{
    showprev(pageurl)  
}

showprev=(url)=>{
    
    if((Number(curdiv.innerHTML)-1)<=1)
    {
        prevbtn.style.display="none"
        curdiv.innerHTML='1'
        getmovie(url+1)
    }
    else{
        n=Number(curdiv.innerHTML)
        n=n-1 
        curdiv.innerHTML=`${n}`
        prevbtn.style.display="block"
        //console.log(url)
        getmovie(url+n)
    }
}
 let ttlpages=fetch(popularmovies).then(res=>res.json())
 .then(data=>{return data.total_pages})

 printpgs=async()=>{
    const res=await(ttlpages)
    console.log(res)
    ttlpagesdiv.innerHTML=`Total Pages: ${res}`
} 
printpgs()

nextbtn.onclick=()=>
{
   shownext(pageurl)  
}

shownext=(url)=>{
    printpgs()
    let a=ttlpagesdiv.innerHTML.split(" ")
    //console.log("testing",Number(a[a.length-1]),Number(curdiv.innerHTML))
    x=Number(a[a.length-1])
    if(Number(curdiv.innerHTML)<=x)
    {
        if(curdiv.innerHTML!='1'||'0')
     {
         prevbtn.style.display="block"
     }
     n=Number(curdiv.innerHTML)
     n=n+1 
     curdiv.innerHTML=`${n}`
     getmovie(url+n)
    }
    else{
        nextdiv.style.display="none"
    }
}

gobtn.onclick=async()=>{
    let s=Number(gotoinp.value)
    const res=await(ttlpages)
    console.log(res)
    if(s<=res & s>1)
    {
        console.log(s)
        getmovie(pageurl+s)
        curdiv.innerHTML=s
        prevbtn.style.display="block"
    }
    else if(s=1)
    {
        getmovie(popularmovies)
        prevbtn.style.display="none"
        curdiv.innerHTML=s

    }
    else 
    {
        btmpgecontrolsdiv.innerHTML+=`<b>Enter valid page number greater than zero</b>`
    }
    
}
//NORMAL PAGENATION END

//GENERE PAGENATION START
genreprevbtn.onclick=()=>{
    let u= getsearchselection()+'&page='
    showgenreprev(u)
}
showgenreprev=(url)=>{
    console.log(url)
    if((Number(genrecurdiv.innerHTML)-1)<=1)
    {
        genreprevbtn.style.display="none"
        genrecurdiv.innerHTML='1'
        getmovie(url+1)
    }
    else{
        n=Number(genrecurdiv.innerHTML)
        n=n-1 
        genrecurdiv.innerHTML=`${n}`
        genreprevbtn.style.display="block"
        //console.log(url)
        getmovie(url+n)
    }
}
genrenextbtn.onclick=()=>{
    //console.log(" next works")
    let u= getsearchselection()+'&page='
    console.log(u)
    showgenrenext(u)
}
showgenrenext=(url)=>{
    printgenrepgs()
    let a=genrettlpagesdiv.innerHTML.split(" ")
    //console.log("testing",Number(a[a.length-1]),Number(curdiv.innerHTML))
    x=Number(a[a.length-1])
    if(Number(genrecurdiv.innerHTML)<=x)
    {
        if(genrecurdiv.innerHTML!='1'||'0')
     {
         genreprevbtn.style.display="block"
     }
     n=Number(genrecurdiv.innerHTML)
     n=n+1 
     genrecurdiv.innerHTML=`${n}`
     console.log(url+n)
     getmovie(url+n)
    }
    else{
        genrenextbtn.style.display="none"
    }
}
genregobtn.onclick=()=>{
    let x=Number(genregotoinp.value)
    let arr=genrettlpagesdiv.innerHTML.split(" ")
    let tot=arr[arr.length-1]
    tot=Number(tot)
    //console.log(tot,x)
    if(x>0 & x<(tot+1))
    {
        getmovie(getsearchselection()+'&page='+x)
        genrecurdiv.innerHTML=x
    }
    else
    {
      maindiv.innerHTML='<b>pls enter valid page number<b>'
    }

}

//GENERE PAGENATION END
}