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
    theme: 'snow'
  });

  const quill2 = new Quill('#editor2', {
    modules: {
    toolbar: false
    },
    theme: 'snow'
  });
  
  const snippeteditor = new Quill('#snippeteditor', {
    modules: {
    toolbar: false
    },
    theme: 'snow'
  });

  const fueditor = new Quill('#fueditor', {
    modules: {
    toolbar: false
    },
    theme: 'snow'
  });

  const finishededitor = new Quill('#finishededitor', {
    modules: {
    toolbar: false
    },
    theme: 'snow'
  });

function SaveToClipboard() {

    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();

    document.getElementById("finishededitor").style.display = "block";
    finishededitor.setContents([
        {insert: datetime + "\n"},
      ])
      
    if(followupCheck.checked == true)
    {
        finishededitor.insertText(finishededitor.getLength(), 'Follow Up Reason:\n', 'bold', true);
        finishededitor.insertText(finishededitor.getLength(), fueditor.getText() + "\n");
        finishededitor.insertText(finishededitor.getLength(), 'FU Name: ' + nameText.value + "\n");
        finishededitor.insertText(finishededitor.getLength(), 'FU Number: ' + numberText.value + "\n \n");
    }

    finishededitor.insertText(finishededitor.getLength(), 'The Problem:\n', 'bold', true);
    finishededitor.insertText(finishededitor.getLength(), quill.getText() + "\n \n");
    finishededitor.insertText(finishededitor.getLength(), 'What I Did:\n', 'bold', true);
    finishededitor.insertText(finishededitor.getLength(), quill2.getText() + "\n \n");

    if(snipCheck.checked == true)
    {
        finishededitor.insertText(finishededitor.getLength(), 'Snippet:\n', 'bold', true);
        finishededitor.insertText(finishededitor.getLength(), snippeteditor.getText() + "\n \n");
    }
}