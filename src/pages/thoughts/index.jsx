import path from 'path';
import fs from 'fs';
import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml';
import { QuickLink, QuickLinks } from '@/components/QuickLinks';

export default function Page({pagesData}) {
  return (
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
  )
}

export function getStaticProps () {
  const filesPath = path.resolve(process.cwd(), 'src', 'pages', 'thoughts')
  let pagesData = fs.readdirSync(filesPath, { withFileTypes: true })
    .filter(f => !f.isDirectory() && !f.name.startsWith('index'))
    .map(f => path.resolve(filesPath, f.name))

  pagesData.reverse()

  pagesData = pagesData.map(getPostData)

  return {
    props: {
      title: 'Thoughts',
      pagesData
    }
  }
}

function getPostData(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').toString();
  const ast = Markdoc.parse(content)
  let frontmatter = yaml.load(ast.attributes.frontmatter)
  frontmatter = { ...frontmatter, href: `/thoughts/${path.parse(filePath).name}`}
  return frontmatter
}
