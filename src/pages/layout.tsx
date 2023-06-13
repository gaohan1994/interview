/*
 * @Author: linewell.gzhiying
 * @Date: 2021-10-19 10:21:57
 * @LastEditors: linewell.gzhiying
 * @LastEditTime: 2021-10-19 14:52:02
 * @Description: 布局相关工具
 */
import { useEffect, useState, useCallback } from 'react';

/** 刚好铺满屏的高度（扣掉标题栏和面包屑） */
export const fullScreenHeight = 'calc(100vh - 150px)';

/**
 * @todo 获取窗口信息
 * @returns
 */
function useClientRect() {
  const [rect, setRect] = useState<any>(null);
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, ref];
}

/**
 * 上下卡片结构，下面的卡片高度为整体高度扣除上面的卡片高度，下面的卡片中
 * table高度的计算
 * @param props
 * @returns
 */
export function useBottomTableHeight(props: {
  extraTableHeight?: number; // table额外的高度
  extraCardHeight?: number; // 卡片额外的高度（上下均为卡片需要扣除24的padding值）
}) {
  const { extraTableHeight = 0, extraCardHeight = 24 } = props;
  const [containerRect, containerRef] = useClientRect();
  const [topCardRect, topCardRef] = useClientRect();
  const [, bottomCardRef] = useClientRect();
  const [tableScrollHeight, setTableScrollHeight] = useState('');
  const [tableCardHeight, setTableCardHeight] = useState('');

  console.log('test aaa', topCardRect, containerRect);

  useEffect(() => {
    const containerCardHeight = containerRect?.height || 800;
    const descCardHeight = topCardRect?.height || 150;
    // 表头高度
    const tableTheadDom = bottomCardRef?.current?.getElementsByClassName('ant-table-thead');
    const tableTheadHeight =
      Array.isArray(tableTheadDom) && tableTheadDom.length > 0
        ? tableTheadDom[0]?.getBoundingClientRect()?.height || 47
        : 47;
    // 工具栏高度
    const tableToolbarDom = bottomCardRef?.current?.getElementsByClassName(
      'ant-pro-table-list-toolbar-container',
    );
    const tableToolbarHeight =
      Array.isArray(tableToolbarDom) && tableToolbarDom.length > 0
        ? tableToolbarDom[0]?.getBoundingClientRect()?.height || 64
        : 64;
    // 分页工具高度
    const tablePaginationDom = bottomCardRef?.current?.getElementsByClassName('ant-pagination');
    const tablePaginationHeight =
      Array.isArray(tablePaginationDom) && tablePaginationDom.length > 0
        ? tablePaginationDom[0]?.getBoundingClientRect()?.height || 24
        : 24;
    // 表格卡片高度
    const tableCardHeightP = containerCardHeight - extraCardHeight - tableTheadHeight;
    // 表格滚动高度
    const tableScrollHeightP =
      tableCardHeightP -
      extraTableHeight -
      descCardHeight -
      tableTheadHeight -
      tableToolbarHeight -
      tablePaginationHeight;
    setTableCardHeight(`${tableCardHeightP}px`);
    setTableScrollHeight(`${tableScrollHeightP}px`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, topCardRef]);

  return { containerRef, topCardRef, bottomCardRef, tableCardHeight, tableScrollHeight };
}
