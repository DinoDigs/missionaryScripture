    let bookTitles = ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Solomon's Song","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","1 Nephi","2 Nephi","Jacob","Enos","Jarom","Omni","Words of Mormon","Mosiah","Alma","Helaman","3 Nephi","4 Nephi","Mormon","Ether","Moroni","Doctrine and Covenants","Moses","Abraham","Joseph Smith--Matthew","Joseph Smith--History","Articles of Faith"];


   // console.log(title,"\n",verseTitle,text,"\n\n");
   // console.log(title,"\n",book,chapter + ":" + verse,text);

    const mainButton = document.getElementById("ranButton");
    const testButton = document.getElementById("testing");
    const mishinarie = document.getElementById("mishMode");
    //^^^french version of missionary^^^

    const smallHomeButton = document.getElementById("home");
    const smallTestButton = document.getElementById("testingCor");
    const smallRandomScripture = document.getElementById("ranButtonCor");
    const smallMissionaryButton = document.getElementById("mishModeCor");

    const likenButton = document.getElementById("like");
    const corContainerId = document.getElementById("cornerContainerId");
    const showScripture = document.getElementById("showScripture");
    
    window.onload=function onStart(){
      likenButton.style.display="none";
      corContainerId.style.display="none";
    }

    function showPages(pageId){

      document.getElementById("showScripture").style.display="none";
      document.getElementById("testingPage").style.display="none";
      document.getElementById("mishModePage").style.display="none";
      document.getElementById("homePage").style.display="none"

      document.getElementById(pageId).style.display = "block";
    }

    smallHomeButton.addEventListener("click", () => {
      showPages("homePage");
      document.getElementById("cornerContainerId").style.display="none";
      testButton.style.display="block";
      mishinarie.style.display="block";
      mainButton.style.display="block";

    })

    smallMissionaryButton.addEventListener("click", () => {
      testButton.style.display="none";
      mainButton.style.display="none";
      mishinarie.style.display="block"
      corContainerId.style.display="block";
      showPages("mishModePage");
      document.getElementById("mishModePage");
    })

    smallTestButton.addEventListener("click", () => {
      mishinarie.style.display="none";
      mainButton.style.display="none";
      testButton.style.display="block";
      corContainerId.style.display="block";
      showPages("testingPage");
      document.getElementById("testingPage");
    })

    smallRandomScripture.addEventListener("click", () => {
      likenButton.style.display = "block";
      corContainerId.style.display = "block";
      testButton.style.display = "none";
      mishinarie.style.display = "none";
      mainButton.style.display= "block";
      showPages("showScripture");
      showScripture.innerHTML = `<h2>${verseTitle}</h2><p>${text}</p>`
    })

    testButton.addEventListener("click", () => {
      mishinarie.style.display="none";
      mainButton.style.display="none";
      corContainerId.style.display="block";

      showPages("testingPage");
      document.getElementById("testingPage");
      mishinarie.style.display="none";
      mainButton.style.display="none";

    })
    
    mishinarie.addEventListener("click", () => {
      
      testButton.style.display="none";
      mainButton.style.display="none";
      corContainerId.style.display="block";
      showPages("mishModePage");
      document.getElementById("mishModePage");
    })

    mainButton.addEventListener("click", () => {

      likenButton.style.display = "block";
      corContainerId.style.display = "block";
      testButton.style.display = "none";
      mishinarie.style.display = "none";


      showPages("showScripture");
      
      function scriptures(bookTitles) {
         return Math.floor(Math.random() * bookTitles.length);
      }


      let index = scriptures(bookTitles);
      // selectedBook = "Genesis" 
      let selectedBook = bookTitles[index]
      //selects book from array

      fetch ('scriptures.json')
        .then (response => response.json())
        .then (data => {

        /*
        "volume_title": "Old Testament",
        "book_title": "Genesis",
        "book_short_title": "Gen.",
        "chapter_number": 1,
        "verse_number": 1,
        "verse_title": "Genesis 1:1",
        "verse_short_title": "Gen. 1:1",
        "scripture_text": "In the beginning God created the heaven and the earth."
        */
    
        let bookVerse = data.filter(eachVerse => {
          return eachVerse.book_title === selectedBook;
        });

        let randomIndex = Math.floor(Math.random() * bookVerse.length)
         /*{volume_title: 'Old Testament', book_title: 'Job', book_short_title: 'Job',
         chapter_number: 9, verse_number: 26, …}
         */

        let randomVerse = bookVerse[randomIndex];

        let verseTitle = randomVerse.verse_title;
        let title = randomVerse.volume_title;
        let book = randomVerse.book_title;
        let chapter = randomVerse.chapter_number;
        let verse = randomVerse.verse_number;
        let text = randomVerse.scripture_text;

        showScripture.innerHTML = `<h2>${verseTitle}</h2><p>${text}</p>`

      });
    
    });
