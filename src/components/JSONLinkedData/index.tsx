import type { SchemaParams } from '@/types/jsonLd';
import { createSchemaJsonLD } from '@/utils/schemaJson/createSchemaJsonLD';

const JSONLinkedData = (params: SchemaParams) => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createSchemaJsonLD(params)) }} />
    </>
  );
};

export default JSONLinkedData;
