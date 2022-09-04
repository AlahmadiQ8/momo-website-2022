import React from 'react';
import path from 'path';
import fs from 'fs';
import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml';
import { QuickLink, QuickLinks } from '@/components/QuickLinks';
import nodes from '../../../markdoc/nodes'
import tags from '../../../markdoc/tags'

const content = `
This space is more like a trash bin of my writing attempts. I choose to keep them publish to reflect on my growth.
`
const ast = Markdoc.parse(content)
const contentTransformed = Markdoc.transform(ast, {nodes, tags});
const renderedContent = Markdoc.renderers.html(contentTransformed)

export default function Page({ pagesData }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: renderedContent}} />
      <QuickLinks>
        {pagesData.map(data => (
          <QuickLink
            key={data.href}
            title={data.title}
            time={data.created}
            href={data.href}
            description={data.description} />
        ))}
      </QuickLinks>
    </>
  )
}

export function getStaticProps() {
  const filesPath = path.resolve(process.cwd(), 'src', 'pages', 'archive')
  let pagesData = fs.readdirSync(filesPath, { withFileTypes: true })
    .filter(f => !f.isDirectory() && !f.name.startsWith('index'))
    .map(f => path.resolve(filesPath, f.name))

  pagesData.reverse()

  pagesData = pagesData.map(getPostData)

  return {
    props: {
      title: 'Archive',
      pagesData
    }
  }
}

function getPostData(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').toString();
  const ast = Markdoc.parse(content)
  let frontmatter = yaml.load(ast.attributes.frontmatter)
  frontmatter = { ...frontmatter, href: `/archive/${path.parse(filePath).name}` }
  return frontmatter
}
