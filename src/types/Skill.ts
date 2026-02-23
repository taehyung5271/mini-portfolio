export interface SkillDescription {
    id: number;
    content: string;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    skill_descriptions: SkillDescription[];
}