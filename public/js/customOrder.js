function msg(){
                swal({
                      title: "Thank You!",
                      text: "Your Email has been sent. I'll get back to you soon",
                      imageUrl:"img/logo.png"
                });
}

$(document).ready(function(){
                var preview = document.querySelectorAll('img')[1];//selects the query named img

                var from,to,subject,text,phone,url,file;
                $("#send_email").click(function(){      
                to= "griblake@gmail.com";
                subject=$("#subject").val();
                firstName=$("#firstName").val();
                lastName=$("#lastName").val();
                description=$("#description").val();
                file =$("#upload").val(); 
                url = preview.src;   
                //email body starts
                text =  "Name: "    + firstName +" " + lastName + '\n' +
                    "description: " + description + '\n' +
                    "email: "   + subject ;

                $.get("/send",{to:to,subject:subject,text:text,url:url,file:file},function(data){

                    if(data=="sent")
                {
                    //alert("Email has been sent to "+to+" . Thank You");
                    //trying out new alert
                    //sweetAlert("something")
                    msg();
                    document.getElementById("form").reset();
                    preview.src = "";
                   // $("#message").empty().html("Email has been sent to "+to+" . Please check inbox !");
                }

            });
                });
            });