import React, { Component, PropTypes } from 'react';
import AltContainer from 'alt-container';
import { Badge, Glyphicon } from 'react-bootstrap';
import { find } from 'lodash';
import session from 'services/session';
import classNames from 'classnames';
import LikesActions from 'actions/likes';
import likePropTypes from 'prop_types/like';

export default class Like extends Component {
  static propTypes = {
    imageId: PropTypes.number,
    likes: PropTypes.arrayOf(PropTypes.shape(likePropTypes))
  }

  currentUsersLike = () => {
    const { likes, imageId } = this.props;
    const { id: userId } = session.currentUser().user;

    return find(likes, { imageId, userId });
  }

  handleClick = () => {
    const { imageId } = this.props;
    const like = this.currentUsersLike();

    if (like) {
      LikesActions.destroy(like.id);
    } else {
      LikesActions.create(imageId);
    }
  }

  likeClass = () => {
    return classNames({ 'text-danger': this.currentUsersLike() });
  }

  render() {
    const { likes, imageId } = this.props;

    return (
      <Badge onClick={ this.handleClick }>
        <Glyphicon
          className={ this.likeClass() }
          glyph="heart"
        />
        &nbsp;
        { likes.filter(like => like.imageId == imageId).length }
      </Badge>
    );
  }
}