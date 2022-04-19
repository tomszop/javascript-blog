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
    optTitleListSelector = '.titles';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(){

    /* [DONE]remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  
    /* [DONE]for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for(let article of articles){

      /* [DONE]get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE]find the title element */
      /* [DONE]get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE]create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    console.log(html);

    const links = document.querySelectorAll('.titles a');
    console.log(links);
      
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
}