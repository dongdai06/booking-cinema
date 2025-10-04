import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import "./index.less";

export type SubItem = {
  key: string;
  label: string;
  to?: string;
};

export type MenuItem = {
  key: string;
  label: string;
  to?: string;
  children?: SubItem[];
};

type Props = {
  items: MenuItem[];
  onSelect?: (key: string) => void;
};

const TwoLevelMenu: React.FC<Props> = ({ items, onSelect }) => {
  const buildItems: MenuProps["items"] = items.map((it) => {
    if (it.children && it.children.length > 0) {
      return {
        key: it.key,
        label: it.label,
        children: it.children.map((c) => ({ key: c.key, label: c.label })),
      } as MenuItem;
    }
    return { key: it.key, label: it.label } as MenuItem;
  });

  const handleClick: MenuProps["onClick"] = (e) => {
    onSelect?.(e.key);
  };

  return (
    <div className="twolevel-menu">
      <Menu mode="horizontal" items={buildItems} onClick={handleClick} />
    </div>
  );
};

export default TwoLevelMenu;
