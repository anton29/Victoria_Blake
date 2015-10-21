function msg(){
                swal({
                      title: "Thank You!",
                      text: "Your Email has been sent i'll get back to you soon.",
                      imageUrl:"img/logo.png"
                });
}

$(document).ready(function(){
                console.log("called")
                var from,to,subject,text,phone,url,file;
                $("#send_email").click(function(){      
                to= "griblake@gmail.com";
                subject=$("#subject").val() + "would like to get in touch " ;
                firstName=$("#firstName").val();
                lastName=$("#lastName").val();
                Description=$("#Description").val();
                phone=$("#phone").val();  
                //email body starts
                text =  firstName +" " + lastName + " would like to get in touch " + '\n' +
                    "Description: " + Description + '\n' +
                    "phone: "   + phone +'\n' +
                    "email: "   + subject ;

                $.get("/send",{to:to,subject:subject,text:text},function(data){

                    if(data=="sent"){
                    msg();
                    document.getElementById("form").reset();
                }

            });
                });
            });