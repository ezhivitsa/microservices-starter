import React, { ReactElement } from 'react';

import { Heading } from '../heading';
import { Paragraph, ParagraphSize } from '.';

const sizes = [ParagraphSize.S, ParagraphSize.M, ParagraphSize.L, ParagraphSize.XL];

export default function InputDemo(): ReactElement {
  return (
    <div>
      {sizes.map((size) => {
        return (
          <Paragraph key={size} size={size}>
            Text
          </Paragraph>
        );
      })}

      <Heading>Muted paragraphs</Heading>
      {sizes.map((size) => {
        return (
          <Paragraph key={`muted-${size}`} size={size} muted>
            Text
          </Paragraph>
        );
      })}
    </div>
  );
}
