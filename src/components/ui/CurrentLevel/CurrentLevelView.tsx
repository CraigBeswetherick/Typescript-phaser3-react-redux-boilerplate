import * as React from 'react';

interface Props {
  currentLevel: Number;
}

const CurrentLevelView = (props: Props) => {
  return <p>Current Level: {props.currentLevel}</p>;
};

export default CurrentLevelView;
