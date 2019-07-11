import React from 'react';

import { colors } from 'ts/style/colors';
import { styled } from 'ts/style/theme';

interface IGroupProps {
    heading: string;
    name: string;
    filters: IFilterProps[];
}

interface IFilterProps {
    value: string;
    label: string;
}

const groups: IGroupProps[] = [
    {
        heading: 'Topic',
        name: 'topic',
        filters: [
            {
                value: 'mesh',
                label: 'Mesh',
            },
            {
                value: 'testing',
                label: 'Testing',
            },
            {
                value: 'mesh',
                label: 'Mesh',
            },
            {
                value: 'testing',
                label: 'Testing',
            },
        ],
    },
    {
        heading: 'Level',
        name: 'level',
        filters: [
            {
                value: 'beginner',
                label: 'Beginner',
            },
            {
                value: 'intermediate',
                label: 'Intermediate',
            },
            {
                value: 'advanced',
                label: 'Advanced',
            },
        ],
    },
];

interface ITableOfContentsProps {
    contents: IContents[];
}

export interface IContents {
    children: IContents[];
    id: string;
    level: number;
    title: string;
}

const Level: React.FC<{ data: IContents[] }> = ({ data }) => {
    return (
        <ChapterLinksWrapper>
            {data.map((m, index) => {
                return (
                    <>
                        <ChapterLink key={index} level={m.level}>
                            <a href={`#${m.id}`}>{m.title}</a>
                        </ChapterLink>
                        {m.children.length > 0 && <Level data={m.children} />}
                    </>
                );
            })}
        </ChapterLinksWrapper>
    );
};

export const TableOfContents: React.FC<ITableOfContentsProps> = ({ contents }) => {
    console.log('contents', contents);
    return (
        <>
            <Level data={contents} />
            {/* {groups.map(({ heading, name, filters }: IGroupProps, groupIndex) => (
                <ChapterGroupWrapper key={`filter-group-${groupIndex}`}>
                    <ChapterLink href="#index" hasChildren={filters.length > 0}>
                        {heading}
                    </ChapterLink>
                    <ChapterChildren>
                        {filters.map(({ value, label }: IFilterProps, filterIndex) => (
                            <ChapterSublink
                                href={`#filter-${name}-${filterIndex}`}
                                key={`filter-${name}-${filterIndex}`}
                                data-level="2"
                            >
                                {label}
                            </ChapterSublink>
                        ))}
                    </ChapterChildren>
                </ChapterGroupWrapper>
            ))} */}
        </>
    );
};

const ChapterLinksWrapper = styled.ul`
    position: relative;
`;

const ChapterGroupWrapper = styled.li`
    margin-bottom: 1.111em;
`;

const ChapterLink = styled.p<{ level: number }>`
    padding-bottom: 1rem;
    color: ${colors.textDarkSecondary};
    display: block;
    font-size: 0.8333rem;

    & + ul p {
        border-left: 1px solid #e3e3e3;
        padding-left: 0.7rem;
        font-size: 0.7222rem;

        &:last-of-type {
            padding-bottom: 0;
        }
    }
`;

const ChapterSublink = styled(ChapterLink)`
    font-size: 0.7222rem;
    line-height: 1.45;

    &:not(:first-child) {
        margin-top: 0.555555556rem;
    }
`;

// const ChapterGroupWrapper = styled(Heading)`
//     color: ${colors.textDarkPrimary};
//     font-size: 1rem !important;
//     font-weight: 400 !important;
//     margin-bottom: 1em !important;
// `;

const ChapterChildren = styled.div`
    border-left: 1px solid #e3e3e3;
    padding-left: 0.7rem;
`;