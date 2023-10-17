const fs = require('fs');
const PDFParser = require('pdf-parse');
// import { PdfReader } from "pdfreader";
const pdf2html = require('pdf2html');
​
​
const pdfFilePath = '/test/Resume-Paris.pdf';
​
const parsePDF = async () => {
​
	const html = await pdf2html.html(pdfFilePath);
	console.log();
	fs.writeFileSync('test/output.html', JSON.stringify(html));
}
​
PDFParser(pdfBuffer, options)