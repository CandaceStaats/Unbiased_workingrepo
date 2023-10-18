const fs = require('fs');
const PDFParser = require('pdf-parse');

const pdfFilePath = 'Resume-Paris.pdf';

const pdfBuffer = fs.readFileSync(pdfFilePath);

// data structure for our parsed output
const sections = {
	personal: {},
	education: {},
	workExperience: {},
	skills: {},
	miscellaneous: {}
};

function process_text_content(textContent) {
	let lastY, text = '';
	let styleAscent;
	for (let item of textContent.items) {
		if (lastY == item.transform[5] || !lastY){
			text += item.str;
		}
		else{
			if (styleAscent != textContent.styles[item.fontName].ascent)
			{
				text += '\n'
			}
			text += '\n' + item.str;
		}
		lastY = item.transform[5];
		styleAscent = textContent.styles[item.fontName].ascent
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
