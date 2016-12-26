import React from 'react';

export default ({ item }) => {
  console.log("@item", item)
  return (
    <div>
      {item.id.videoId}
    </div>
  );
};
