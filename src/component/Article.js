import React from 'react'

import '../style/article.css'

export default class Article extends React.Component {


  render() {
    const {json} = this.props

    return (
      <div className="article">
        {json.map((item, n) => <ArticleItem key={n} item={item} />)}
      </div>
    )
  }
}


class ArticleItem extends React.Component {

  renderPicture(item) {
    return (
      <div className="article-picture">
        <img src={item.pictureUrl} alt="Triposo" />
        {item.pictureCaption ? <p>{item.pictureCaption}</p> : ""}
      </div>
    )
  }

  render() {
    const {item} = this.props
    return (
      <div className="article-item">
        {item.title ? <h2>{item.title}</h2> : ""}
        {item.pictureUrl ? this.renderPicture(item): ""}
        {item.text ? <p dangerouslySetInnerHTML={{__html:item.text}}></p> : ""}
      </div>
    )
  }
}
