var count=0;
function submit(){
	document.getElementById('loader').style.display='block';
	document.getElementById('table').style.display='none';
	count = 0;
    	document.querySelector("tbody").innerHTML="";
    	document.querySelector("thead").innerHTML="";
    	var csv=document.getElementById('csv-file');
    	const fr = new FileReader();
    	fr.onloadend=e=>{
        	let r =fr.result.split("\n").map(e=>{
        		return e.split(",")
        	});
		r.pop();
        	r.forEach(e=>{
            	if(count!==0){
               	let m = e.map(e=>{
                    		return `<td>${e}</td>`;
                	}).join("");
                	m+=`<td><button class="btn btn-delete" onclick="deleteRow(${count})">Delete</button></td>`;
                	const ce =document.createElement("tr");
                	ce.setAttribute("id",count);
                	ce.innerHTML=m;
		        if(ce.innerText!==""){
		            document.querySelector("tbody").append(ce);
		        }
            	}
            	else if(count===0){
                	let m = e.map(e=>{
                    		return `<th>${e}</th>`;
                	}).join("");
                	m+=`<th>Action</th>`;
                

                	const ce =document.createElement("tr");
                	ce.innerHTML=m;
		        if(ce.innerText!==""){
		            document.querySelector("thead").append(ce);
		        }
            	}
            	count++;
        });
	}
    	fr.readAsText(csv.files[0]);
    	
	document.getElementById('table').style.display='block';
    	document.getElementById('hidden').style.display="flex";
	document.getElementById('loader').style.display='none';
}

function exportCSV(){
        let aH=tableToArr('thead');
        let aD=tableToArr('tbody');
        let de=",";
        let header=aH.join(de)+"\n";
        let csv = header;
        aD.forEach(arr => {
            csv+=arr.join(de)+"\n"
        });

        let csvData = new Blob([csv],{type:'text/csv'});
        let csvURL=URL.createObjectURL(csvData);
    
        let hE=document.createElement('a');
        hE.href=csvURL;
        hE.target='_blank';
        hE.download='document.csv';
        hE.click();
}

function tableToArr(tLoc){
    var array=[];
    var table = document.querySelector(`table ${tLoc}`);
    var rows = table.children;
    for(var i = 0; i<rows.length;i++){
        var fields = rows[i].children;
        var rowArray = [];
        for (var j = 0; j<fields.length-1;j++){
            if(fields[j].innerText!==""){
                rowArray.push(fields[j].innerText);
            }
            else{
                rowArray.push(fields[j].firstChild.value);
            }
        }
        array.push(rowArray);
    }    
    return array;
}

function addRow(){
    var tdNum=document.querySelector("table tbody tr").children.length;
    var row=document.createElement('tr');
    row.setAttribute("id",count);
    for (var i = 0;i<tdNum-1;i++){
        var td=document.createElement('td');
        var input=document.createElement('input');
        input.setAttribute("type","text");
        td.append(input);
        row.append(td);
    }
    var del=document.createElement('td');
    del.innerHTML=`<button class="btn btn-delete" onclick="deleteRow(${count})">Delete</button>`;
    row.append(del);
    document.querySelector('tbody').append(row);
    
    count++;
}
function loader(){
    	document.getElementById('loader').style.display='block';
}
function deleteRow(rowId){
	document.getElementById(rowId).remove();
}
