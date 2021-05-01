//Change ID===================================================================================================================================
function change_id()

{       
        
        //Get Value From LocalStorage For ID
        document.getElementById("txt_ID").innerHTML = localStorage.getItem("ID_Number");

        //Storelocal Storage + 1 (Auto Increment)
        i++;
        document.getElementById('display_ID').innerHTML = document.getElementById("txt_ID").value = i;
        localStorage.setItem("ID_Number", document.getElementById("display_ID").innerHTML);     

}

//Storing data Youtube:===============================================================================================================================
function save1()
{

// TextBox Validity
var v =  document.getElementById('display_ID').innerHTML= document.getElementById("txt_ID").value
var x = document.getElementById('display_youtube_embeded').innerHTML= document.getElementById("txt_youtube_embed").value
var y =  document.getElementById('display_description').innerHTML= document.getElementById("txt_description").value


if (x == "") 


{

//if not fill display error
alert("Please Fill In The Embeded Youtube Key");

}


else if (y == "")

{

//if not fill display error
alert("Please Fill In The Description");

}


else if (v == "")

{

//if not fill display error
alert("ID Cannot Be Zero, Please'Click Here To Give ID'");

}

else

{

//Used Json To Insert Localstorage
var myObj, myJSON, text, obj;


myObj = {"Youtube_key": document.getElementById("display_youtube_embeded").innerHTML = document.getElementById("txt_youtube_embed").value,
        "Content": document.getElementById('display_description').innerHTML = document.getElementById('txt_description').value};


myJSON = JSON.stringify(myObj);
localStorage.setItem(document.getElementById('display_ID').innerHTML= document.getElementById("txt_ID").value,myJSON);


alert("Youtube API Create Sucessfull");
location.reload();

}
}

// Display All From LocalStorage:=============================================================================================================
var key = "";
var list = ""
var i = 0;

		
for (i = 0; i <= localStorage.length - 1; i++)
		
{

key = localStorage.key(i);
			
list += "<li class=list-group-item> <p1 align=top>ID: " + key + "</p1><button class='btn btn-danger btn-sm float-right' delete>Online</button> <br> <table border='0'><tr><td >" + localStorage.getItem(key) + "</td></table>";

}
		
document.getElementById('list').innerHTML = list;

//Delete :==================================================================================================================================
function removeItem()
{

//TextBox Validity
var z = document.getElementById('id_2').innerHTML= document.getElementById("txt_ID_2").value
        
if (z == "") 
        
        {

        alert("Please Choose ID To Delete");

        }

        //check if same value inside localstorage error delete
        else if (localStorage.getItem(document.getElementById("txt_ID_2").value) == null)

        {
             
        alert("Delete ID Not Found");

        }

        else

        {

 alert("Remove API Sucessfull");

 //Delete
 var delete_id = document.getElementById('txt_ID_2').value;

 document.getElementById("txt_ID_2").value = localStorage.removeItem(delete_id);
 location.reload();

        }
        }

//Clear All Local Storage
function clear_table()
	
   {
           
    localStorage.clear();
    location.reload();
 
   }

   // ============================================================================================================================
   //Autofill Database API

   function autofill_1()
	
   {
           
    localStorage.clear();
    location.reload();


    //Used Json To Insert Localstorage
    var myObj, myJSON, text, obj;

     myObj = {"Youtube_key": document.getElementById("auto_fill_youtube_embeded_1").innerHTML = document.getElementById("1_auto_txt_youtube_embed").value,
              "Content": document.getElementById('auto_display_description_1').innerHTML = document.getElementById('1_auto_txt_description').value};

     myJSON = JSON.stringify(myObj);
     localStorage.setItem(document.getElementById('auto_fill_id_1').innerHTML= document.getElementById("1_auto_txt_ID").value,myJSON);

     alert("Auto Fill News Added");
     location.reload();

     }


  



		