{ 
  'use strict';

  /*
  document.getElementById('test-button').addEventListener('click', function(){
      const links = document.querySelectorAll('.titles a');
      console.log('links:', links);
    });
    */

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
    
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
    
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
      
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log(targetArticle);
  };

  //generate title links
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optTagsListSelector = '.tags.list';
    
  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = ''){
  
    /* [DONE]remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  
    /* [DONE]for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    
    let html = '';
    for(let article of articles){

      /* [DONE]get the article id */
      const articleId = article.getAttribute('id');
      //console.log(articleId)
      /* [DONE]find the title element */
      /* [DONE]get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE]create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    //console.log(html);

    const links = document.querySelectorAll('.titles a');
    //console.log(links);
      
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  //ZMIANA LISTY W CHMURE
  // eslint-disable-next-line no-inner-declarations
  function calculateTagsParams(tags) {
    const params = {max: 0, min: 999999};
    for(let tag in tags){
    //console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }
  //calculateTagsParams();
  // wybranie klasy tagu


  // eslint-disable-next-line no-inner-declarations
  function calculateTagClass (count, params) {
    
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    console.log(classNumber);
    return optCloudClassPrefix + classNumber;
 
  }

  //calculateTagClass();

  //GENERATE TAGS

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
     
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
 
    /* START LOOP: for every article: */
    for (let article of articles) {
 
      /* find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      //console.log(tagWrapper);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log(articleTagsArray)
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        //console.log(tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a>&nbsp</li>';
        //console.log(linkHTML)
        /* add generated code to html variable */
        html = html + linkHTML;
        //console.log(html);
 
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
        //console.log(allTags);
      }
      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html; 
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
 
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
 
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
 
    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //const tagHTML = '<li><a href="#tag-' + tag + '">' + allTagsHTML + '</a></li>';
      //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag +'">' + tag + ' ('+ allTags[tag] + ')</a></li>';
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag +'">' + tag + '</a>&nbsp</li>';
      //console.log('tagLinkHTML:', tagLinkHTML);
      allTagsHTML += tagLinkHTML;
      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
    //console.log(allTagsHTML);
 
  }
  generateTags();

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    
    /* find all tag links with class active OD TEGO MONENTU MAM PROBLEM*/
    const allActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let activeTagLink of allActiveTagLinks){
      /* remove class active */
      activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagLink of allTagLinks){
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    //console.log(generateTitleLinks);
    
  }
  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags(){
    /* find all links to tags */
    const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
    //console.log(allTagsLinks);
    /* START LOOP: for each link */
    for(let tagLink of allTagsLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();


  // GENERATE AUTHORS

  // eslint-disable-next-line no-inner-declarations
  function generateAuthors(){

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles){

      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      //for author generate html of the link - DONE
      const linkHTML = 'autor: <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

      //add code to html variable - DONE
      html = linkHTML;

      /* insert HTML of all the links into the author wrapper */
      authorWrapper.innerHTML = html;

      /* END LOOP: for every article: */
    }
  }
  generateAuthors();

  //---------Author click handler

  // eslint-disable-next-line no-inner-declarations
  function authorClickHandler(event){

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active !!!*/
    const activeAuthorLinks = document.querySelectorAll('a.active [href^="#author-"]');

    /* START LOOP: for each active tag link */
    for (let activeAuthorLink of activeAuthorLinks){

      /* remove class active */
      activeAuthorLink.classList.remove('.active');

      /* END LOOP: for each active tag link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const allAuthorHrefs = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found author link */
    for(let authorHref of allAuthorHrefs){
    /* END LOOP: for each found author link */
      authorHref.classList.add('.active');
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }
  
  //-------- Click Listeners to Authors

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthors () {

    /* find all links to autors */
    const allAuthorLinks = document.querySelectorAll('.post-author a, .authors a');

    /* START LOOP: for each link */
    for(let authorLink of allAuthorLinks){
    //add authorClickHandler as event listener for that ink
      authorLink.addEventListener('click', authorClickHandler);
      // end loop for each link
    }
  }
  addClickListenersToAuthors();

}