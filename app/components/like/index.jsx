import React, { Component, PropTypes } from 'react';
import AltContainer from 'alt-container';
import { Badge, Glyphicon } from 'react-bootstrap';
import find from 'lodash/find';
import Spinner from 'halogen/ClipLoader';
import session from 'services/session';
import classNames from 'classnames';
import LikesActions from 'actions/likes';
import likePropTypes from 'prop_types/like';
import styles from './styles';

export default class Like extends Component {
  static propTypes = {
    imageId: PropTypes.number,
    likeProcessing: PropTypes.bool,
    likes: PropTypes.arrayOf(PropTypes.shape(likePropTypes))
  }

  badgeClass = () => {
    return this.props.likeProcessing ? styles.badgeDisabled : styles.badge;
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
      LikesActions.destroy(like);
    } else {
      LikesActions.create(imageId);
    }
  }

  likeClass = () => {
    return classNames({ 'text-danger': this.currentUsersLike() });
  }

  renderLikes = () => {
    const { likes, likeProcessing, imageId } = this.props;

    if (likeProcessing) {
      return <Spinner color="#fff" size="14px"/>;
    } else {
      return (
        <div>
          <Glyphicon
            className={ this.likeClass() }
            glyph="heart"
          />
          &nbsp;
          { likes.filter(like => like.imageId == imageId).length }
        </div>
      );
    }

  }

  render() {
    const { likeProcessing } = this.props;

    return (
      <Badge className={ this.badgeClass() } onClick={ likeProcessing ? null : this.handleClick }>

        { this.renderLikes() }
      </Badge>
    );
  }
}
