import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import styled from 'styled-components';
import { format } from 'date-fns';
import { NameLink } from '../widgets';
import Avatar from '../Avatar';
import { getPathByName } from '../../routes';

export const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 200px;
`;

const entityIcon = {
  person: 'user',
  mission: 'shopping-cart',
  company: 'home',
};

const StyledCreatedAt = styled.span`
  font-style: italic;
  font-size: 0.8em;
`;

const Footer = ({ note, person, entity }) => {
  if (!note) return null;
  return (
    <StyledFooter>
      {entity &&
        entity.avatar && (
          <Avatar
            name={entity.name}
            size="MEDIUM"
            to={getPathByName(entity.typeName, entity._id)}
            {...entity.avatar}
          />
        )}
      <StyledMain>
        <StyledName>
          <Icon
            iconName={entityIcon[note.entityType]}
            style={{ marginRight: '4px' }}
          />
          {entity && entity.typeName ? (
            <NameLink to={getPathByName(entity.typeName, entity._id)}>
              {entity.name}
            </NameLink>
          ) : (
            entity.name
          )}
        </StyledName>
        {note.createdAt && (
          <StyledCreatedAt>
            {format(note.createdAt, 'dddd, MMMM Do YYYY')}
          </StyledCreatedAt>
        )}
      </StyledMain>
      {person &&
        person.avatar && (
          <Avatar
            name={person.name}
            size="SMALL"
            to={getPathByName('person', person._id)}
            {...person.avatar}
          />
        )}
    </StyledFooter>
  );
};

Footer.propTypes = {
  note: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  person: PropTypes.object,
};

export default Footer;
