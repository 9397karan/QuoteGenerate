let quoteDiv=  document.getElementById('quote')
const tweetButton = document.getElementById('twitterBtn');
const twitterUrl = 'https://twitter.com/intent/tweet';
const pageUrl = window.location.href;

// fetch quote
async function fetchQuote(){
    let res=await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
   let {data}=await res.json();
 quoteDiv.innerHTML=`" ${data.content} "`
   document.getElementById('author').innerHTML=`Author - ${data.author}`
   console.log(data)
}
fetchQuote()

//Next button
document.getElementById('nextBtn').addEventListener('click',fetchQuote)

//Copy to clipboard btn
document.getElementById('copyBtn').addEventListener('click',()=>{
    navigator.clipboard.writeText(quoteDiv.textContent)
})

function openTwitterWindow() {
    const url = `${twitterUrl}?text=${encodeURIComponent(quoteDiv.textContent)}`;
    window.open(url, '_blank', 'width=600,height=500'); 
}

//open twitter post
tweetButton.addEventListener('click', openTwitterWindow);

//download image
document.getElementById('downloadBtn').addEventListener('click',function(){
    const card=document.getElementById('card')
    html2canvas(card).then((canvas)=>{
        let cardUrl=canvas.toDataURL("image/png")
        downloadImage(cardUrl,"Quote.png")
    })
})

function downloadImage(url,name){
    let anchor=document.createElement('a');
    anchor.setAttribute("href",url)
    anchor.setAttribute("download",name)
    anchor.click()
    anchor.remove()
}