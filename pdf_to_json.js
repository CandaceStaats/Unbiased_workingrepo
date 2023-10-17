const fs = require('fs');
const PDFParser = require('pdf-parse');

const pdfFilePath = 'Resume-Paris.pdf';

const pdfBuffer = fs.readFileSync(pdfFilePath);

// data structure for our parsed output
const sections = {
	education: {},
	workExperience: {},
	skills: {}
};


function process_diff_y(textContent){
	var listY = [];
	let lastY, text = '';
	for (let item of textContent.items) {
		lastY = item.transform[5];
		listY.push(lastY);
		
	}
	for (var i = 0; i < listY.length; i++) {
		console.log(listY[i]);
	  }
}



function process_x(textContent) {
	// parser that loops through all the text objects in the pdf
	// let lastY, text = ' ';
	// for (let item of textContent.items) {
	// 	item_x = item.transform[4]
	// 	item_y = item.transform[5]
	// 	item_str = item.str
	// 	console.log(item_str)
	// }
	// return text;
	let lastX, text = '';
	for (let item of textContent.items) {
		if (lastX == item.transform[4] || !lastX){
			text += item.str;
		}
		else{
			text += '\n' + item.str;
		}
		lastX = item.transform[4];
	}
	console.log(text)
	//fs.writeFileSync('output.txt', JSON.stringify(text));
	return text;
}


// function process_styles(textContent) {
// 	// parser that loops through all the text objects in the pdf
// 	// let lastY, text = ' ';
// 	// for (let item of textContent.items) {
// 	// 	item_x = item.transform[4]
// 	// 	item_y = item.transform[5]
// 	// 	item_str = item.str
// 	// 	console.log(item_str)
// 	// }
// 	// return text;
// 	let font, text = '';
// 	for (let item of textContent.styles) {
// 		if (font == style.ascent || !font){
// 			text += style.str;
// 		}
// 		else{
// 			text += '\n' + style.str;
// 		}
// 		font = textContent.styles[style.ascent;
// 	}
// 	console.log(text)
// 	//fs.writeFileSync('output.txt', JSON.stringify(text));
// 	return text
// }

function process_text_content(textContent) {
	// parser that loops through all the text objects in the pdf
	// let lastY, text = ' ';
	// for (let item of textContent.items) {
	// 	item_x = item.transform[4]
	// 	item_y = item.transform[5]
	// 	item_str = item.str
	// 	console.log(item_str)
	// }
	// return text;
	let lastY, text = '';
	for (let item of textContent.items) {
		if (lastY == item.transform[5] || !lastY){
			text += item.str;
			console.log(textContent.styles[item.fontName])
		}
		else{
			text += '\n' + item.str;
		}
		lastY = item.transform[5];
	}
	console.log(text)
	//fs.writeFileSync('output.txt', JSON.stringify(text));
	return text
}

// PDFParser library configuration
function render_page(pageData) {
    //check documents https://mozilla.github.io/pdf.js/
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: false,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false
    }
    return pageData.getTextContent(render_options).then(process_text_content);
}
let options = {
    pagerender: render_page
}
 
// Run PDF parser (populates sections) 
PDFParser(pdfBuffer, options)

// Output json
// fs.writeFile(sections)