/** @jsx React.DOM */

var Comment = React.createClass({

  render: function() {
    return (
      <div className="comment">
        <p className="comment-author">
          <strong>{this.props.author}:</strong>
        </p>
        <div className="comment-text">
          {this.props.comment}
        </div>
      </div>
    );
  }

});

var CommentList = React.createClass({

  render: function() {
    var comments = this.props.comments.map(function (comment, index) {
      return (
        <Comment author={comment.author} comment={comment.comment} key={index} />
      );
    });

    return (
      <div className="commentList">
        {comments}
      </div>
    );
  }

});

var CommentBox = React.createClass({
  getInitialState: function() {
    return { comments: [] };
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
  },

  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      datatype: 'json',
      success: function (comments) {
        this.setState({comments: comments});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.comments;
    var newComments = comments.concat([comment]);
    this.setState({comments: newComments});
    $.ajax({
      url: this.props.url,
      datatype: 'json',
      type: 'POST',
      data: {"comment": comment},
      success: function (data) {
        this.loadCommentsFromServer();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="commentBox">
        <div className="row">
          <h1 className="subheader">Comments</h1>
          <CommentList comments={this.state.comments} />
          <fieldset>
            <legend>Add a comment</legend>
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
          </fieldset>
        </div>
      </div>
    );
  }

});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var comment = this.refs.comment.getDOMNode().value.trim();
    this.props.onCommentSubmit({author: author, comment: comment});
    this.refs.author.getDOMNode().value = '';
    this.refs.comment.getDOMNode().value = '';
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <textarea type="text" placeholder="Say something..." ref="comment" />
        <input className="button" type="submit" value="Post" />
      </form>
    );
  }
});

var ready = function () {
  React.render(
    <CommentBox url="/comments.json" />,
    document.getElementById('comments')
  );
};

$(document).ready(ready);
