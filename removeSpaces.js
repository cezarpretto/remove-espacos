'use strict';
var year = new Date().getFullYear();
$("#year").text(year.toString());
function proccessFile(){
  var input = document.getElementById('inputFile');
  var reader = new FileReader();
  $("#progress").removeClass('hide');
  $("#inputDiv").addClass('hide');
  reader.onload = function(){
    var text = reader.result;
    var lines = text.split(/\n/g);
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/\t/g, '');
      lines[i] = lines[i].replace(/\s{2}/g, '');
    }
    var result = lines.join('\n');
    downloadFile(input.files[0].name, result);
  };
  reader.readAsText(input.files[0]);
};

function downloadFile(name, data){
  $("#progress").addClass('hide');
  $("#inputDiv").removeClass('hide');
  var filename = name + '.txt';
  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4)
  }
  var blob = new Blob([data], {
      type: data.type
  }),
  e = document.createEvent('MouseEvents'),
  a = document.createElement('a')

  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
};
