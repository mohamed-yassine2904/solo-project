$("#sub").click(function () {
    var sex =  $("#Sexe").val()
    console.log("hello");
        var fullname=document.getElementById("firstName").value+" "+document.getElementById("lastName").value;
  console.log(sex);
  
      
      if(sex==="h"){
          document.getElementById("inscri").innerHTML="Mr "+fullname+" vous êtes inscrits";
          //document.getElementsByClassName("titre")[0].style.background = "green";
          document.getElementsByClassName("titre")[0].style.background = "green";
  
  
      }
      else
      {
          document.getElementById("inscri").innerHTML="Mme "+fullname+" vous êtes inscrites";
          document.getElementsByClassName("titre")[0].style.background = "purple";
      }
    
  })