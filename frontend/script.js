function $(str){
    return document.getElementById(str);
}
getDataPost = async (url) => {
    const valami = await fetch(url, {
        method:"POST",
    })
    const data = await valami.json()
    $('tabla').innerHTML = ""
       
        for(let i=0; i<data.length; i++ )
            newTableRow(data[i].name, data[i].address);     
}
function newTableRow(name, address){
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.innerHTML = name;
    let td2 = document.createElement('td');
    td2.innerHTML = address;
 
    tr.appendChild(td1);
    tr.appendChild(td2);
 
 
    $('tabla').appendChild(tr);
}
 
 
// $('lekeres').addEventListener('click', Lekeres);
// $('lekeres').addEventListener('keypress', (event)=>{
//     if( event.key === 'Enter')
//         Kereses();
// })

getDataPost("http://localhost:3000/data")
