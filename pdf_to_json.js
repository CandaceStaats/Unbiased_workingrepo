const fs = require('fs');
const PDFParser = require('pdf-parse');
// // import { PdfReader } from "pdfreader";
// const pdf2html = require('pdf2html');
// ​
// ​
// const pdfFilePath = 'Resume-Paris.pdf';
// ​
// const parsePDF = async () => {
// ​
// 	const html = await pdf2html.html(pdfFilePath);
// 	console.log();
// 	fs.writeFileSync('output.html', JSON.stringify(html));
// }
// ​
// parsePDF().then((sections) => {
// 	console.log(sections);
// });
​
​
 const parsePDF = async () => {
 	const pdfBuffer = fs.readFileSync(pdfFilePath);
 	const pdf = await PDFParser(pdfBuffer);
​
 	const text = pdf.text;
​
 	const sections = {
 		education: {},
 		workExperience: {},
 		skills: {}
 	};
 	 //console.log(text);
 	//console.log(pdf);
​ 	fs.writeFileSync('output.txt', JSON.stringify(pdf));
​
// ​ fs.readFile(pdfFilePath, (err, pdfBuffer) => {
// 	//pdfBuffer contains the file content
// 	new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
//  		if (err) console.error("error:", err);
//  		else if (!item) console.warn("end of buffer");
//  		else if (item.text) console.log(item.text);
//  	});
//  });
​
 	return sections;
};
