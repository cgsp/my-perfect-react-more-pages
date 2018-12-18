import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

const BreadcrumbNav = ({ url, name1, name2 }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={url} style={{ color: 'cornflowerblue' }}>{name1}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{name2}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default BreadcrumbNav
