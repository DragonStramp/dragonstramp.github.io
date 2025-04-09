var copyText = "";
const followupCheck = document.getElementById("fucheck");
const snipCheck = document.getElementById("snipcheck");
const nameText = document.getElementById("nametext");
const numberText = document.getElementById("numbertext");

function followUpToggle()
{
    if(followupCheck.checked == true)
    {
        var fus = document.getElementsByClassName("fu");
        for(i = 0; i < fus.length; i++)
        {
            fus[i].style.display = 'block';
        }
    } else {
        var fus = document.getElementsByClassName("fu");
        for(i = 0; i < fus.length; i++)
        {
            fus[i].style.display = 'none';
        }
    }
}

function CopyAuthPin()
{
  var emailText = "Hello, \n In recent communications with our support team, a copy of the authorization pin for your Mango Voice account was requested. \n \n Authorization Pin: " + document.getElementById("nametext").value + "\n \n This pin is necessary for any Mango Voice support agents to make changes to your account. \n Thank you, \n Mango Voice Support.";
  navigator.clipboard.writeText(emailText);
}
function CopyPasswordLink()
{
  var emailText = "Hello, \n In recent communications with our support team, a password link was requested to access your Mango Voice account. After setting up your password with the link below, you'll be able to log in using the following information: \n \n Username: " + document.getElementById("username").value + "\n Password Link: " + document.getElementById("resetlink").value + "\n \n Thank you, \n Mango Voice Support.";
  navigator.clipboard.writeText(emailText);
}
function CopyProvLink()
{
  navigator.clipboard.writeText("http://profiler.mangovoice.com/profiler/yealink/");
}
function CopyConfLink() 
{
  navigator.clipboard.writeText("http://profiler.mangovoice.com/profiler/yealink/" + document.getElementById("mac").value + ".cfg");
}

function snipToggle()
{
    if(snipCheck.checked == true)
    {
        document.getElementById("snippeteditor").style.display = "block";
    } else {
        document.getElementById("snippeteditor").style.display = "none";
    }
}

const quill = new Quill('#editor', {
    modules: {
    toolbar: false
    },
    // theme: 'snow'
  });

  const quill2 = new Quill('#editor2', {
    modules: {
    toolbar: false
    },
    // theme: 'snow'
  });
  
  const snippeteditor = new Quill('#snippeteditor', {
    modules: {
    toolbar: false
    },
    // theme: 'snow'
  });

  const fueditor = new Quill('#fueditor', {
    modules: {
    toolbar: false
    },
    // theme: 'snow'
  });

  const finishededitor = new Quill('#finishededitor', {
    modules: {
    toolbar: false
    },
    // theme: 'snow'
  });

function SaveToClipboard() {

    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();

    document.getElementById("finishededitor").style.display = "block";
    finishededitor.setContents([
        {insert: ""},
      ])
      
    if(followupCheck.checked == true)
    {
        finishededitor.insertText(finishededitor.getLength(), 'Follow Up Reason:\n', 'bold', true);
        finishededitor.insertText(finishededitor.getLength(), fueditor.getText() + "\n");
        finishededitor.insertText(finishededitor.getLength(), 'FU Name: ' + nameText.value + "\n");
        finishededitor.insertText(finishededitor.getLength(), 'FU Number: ' + numberText.value + "\n \n");
    }

    finishededitor.insertText(finishededitor.getLength(), 'Why They Called:\n', 'bold', true);
    finishededitor.insertText(finishededitor.getLength(), quill.getText() + "\n \n");
    finishededitor.insertText(finishededitor.getLength(), 'What I Did:\n', 'bold', true);
    finishededitor.insertText(finishededitor.getLength(), quill2.getText() + "\n \n");

    if(snipCheck.checked == true)
    {
        finishededitor.insertText(finishededitor.getLength(), 'Snippet:\n', 'bold', true);
        finishededitor.insertText(finishededitor.getLength(), snippeteditor.getText() + "\n");
    }
}