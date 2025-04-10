var copyText = "";
const followupCheck = document.getElementById("fucheck");
const snipCheck = document.getElementById("snipcheck");
const notescheck = document.getElementById("notecheck");
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

function NewPage()
{
    if(confirm("Clear the current ticket?"))
    {
        location.reload();
    }
}

function CopyAuthPin()
{
  var emailText = "Hello, \n In recent communications with our support team, a copy of the authorization pin for your Mango Voice account was requested. \n \n Authorization Pin: " + document.getElementById("nametext").value + "\n \n This pin is necessary for any Mango Voice support agents to make changes to your account. \n Thank you, \n Mango Voice Support.";
  navigator.clipboard.writeText(emailText);
  document.getElementById("pinbutton").text = "Copied!";
  document.getElementById("pinbutton").classList.remove("button");
  document.getElementById("pinbutton").classList.add("buttonpressed");
}
function CopyPasswordLink()
{
  var emailText = "Hello, \n In recent communications with our support team, a password link was requested to access your Mango Voice account. After setting up your password with the link below, you'll be able to log in using the following information: \n \n Username: " + document.getElementById("username").value + "\n Password Link: " + document.getElementById("resetlink").value + "\n \n Thank you, \n Mango Voice Support.";
  navigator.clipboard.writeText(emailText);
  document.getElementById("passbutton").text = "Copied!";
  document.getElementById("passbutton").classList.remove("button");
  document.getElementById("passbutton").classList.add("buttonpressed");
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
  });

  const quill2 = new Quill('#editor2', {
    modules: {
    toolbar: false
    },
  });
  
  const snippeteditor = new Quill('#snippeteditor', {
    modules: {
    toolbar: false
    },
  });

  const fueditor = new Quill('#fueditor', {
    modules: {
    toolbar: false
    },
  });

  const finishededitor = new Quill('#finishededitor', {
    modules: {
    toolbar: false
    },
  });

  const noteseditor = new Quill('#notestext', {
    modules: {
    toolbar: false
    },
  });

function SaveToClipboard() {
    document.getElementById("finishededitor").style.display = "block";
    document.getElementById("copy").text = "Copied!";
    document.getElementById("copy").classList.remove("button");
    document.getElementById("copy").classList.add("buttonpressed");
    finishededitor.setContents([
        {insert: ""},
      ])


    if(snipCheck.checked == true)
      {
        finishededitor.insertText(0, snippeteditor.getText() + "\n", 'bold', false);
        finishededitor.insertText(0, 'Snippet:\n', 'bold', true);
      }

      if(notescheck.checked == true)
      {
        finishededitor.insertText(0, noteseditor.getText() + "\n \n", 'bold', false);
        finishededitor.insertText(0, 'Notes:\n', 'bold', true);
      }      
      
      finishededitor.insertText(0, quill2.getText() + "\n \n", 'bold', false);
      finishededitor.insertText(0, 'What I Did:\n', 'bold', true);
      finishededitor.insertText(0, quill.getText() + "\n \n", 'bold', false);
      finishededitor.insertText(0, 'Why They Called:\n', 'bold', true);

      if(followupCheck.checked == true)
        {
          if(numberText.value != "")
            {
              finishededitor.insertText(0, 'FU Number: ' + numberText.value + "\n \n", 'bold', false);
            }
          if(nameText.value != "")
            {
              finishededitor.insertText(0, 'FU Name: ' + nameText.value + "\n", 'bold', false);
            }
          finishededitor.insertText(0, fueditor.getText() + "\n", 'bold', false);
          finishededitor.insertText(0, 'Follow Up Reason:\n', 'bold', true);
        }
    finishededitor.setSelection(0, finishededitor.getLength());
    document.execCommand('copy');
}
