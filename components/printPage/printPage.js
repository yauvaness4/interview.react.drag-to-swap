import Actions from "../actions";
import { useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay
} from '@dnd-kit/core';
import {
  arraySwap,
  SortableContext,
  rectSwappingStrategy
} from '@dnd-kit/sortable';

import { Wrapper, PrintWrapper, Header, Title, PageLayout } from './styles';
import { SortableItem } from "../sortableItem";
import PhotoPreview from "../preview";

export default function PrintPage({ data }) {
  const [items, setItems] = useState(data);
  const [activeItem, setActiveItem] = useState(null);
  const handleDragStart = useCallback(({ active }) => {
    setActiveItem(active.data.current);
  }, []);

  const handleDragEnd = (event) => {
    const pageNumber = event.active.data.current.sortable.containerId;

    const sourceIndex = event.active.data.current.sortable.index;
    const destinationIndex = event.over.data.current.sortable.index;

    if (sourceIndex !== destinationIndex) {
      const itemsClone = [...items];
      
      itemsClone[pageNumber].images = arraySwap(items[pageNumber].images, sourceIndex, destinationIndex);

      setItems(itemsClone);
      setActiveItem(null);
    }
  };

  const handleDragCancel = useCallback(() => {
    setActiveItem(null);
  }, []);
  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
        <Wrapper>
          {Object.values(data).map((items, i) => {
            return (
              <PrintWrapper key={i}>
                <Header>
                  <Title>{items.title}</Title>
                  <Actions />
                </Header>
                <PageLayout>
                  <SortableContext id={i} items={items.images} strategy={rectSwappingStrategy}>
                    {items.images.map((image, imageId) => (
                      <SortableItem key={imageId} image={image} id={imageId}/>

                    ))}
                  </SortableContext>

                </PageLayout>
              </PrintWrapper>
            );
          })}
          <DragOverlay>
            {activeItem ? (
              <PhotoPreview id={items.id} image={items.images} preview />
            ) : null}
          </DragOverlay>
        </Wrapper>
      </DndContext>

    </>
  );
}
