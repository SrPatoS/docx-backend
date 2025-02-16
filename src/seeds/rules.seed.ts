import { ruleModel } from "@src/models/rule.model";
import { rules } from "@src/rules/rules";

export async function rulesSeed() {
  await ruleModel.insertMany([
    {
      name: "Administrator",
      rules: [...rules.collaborator, ...rules.collaborator],
      tag: "admin"
    },
    {
      name: "Gerente",
      rules: [...rules.manager],
      tag: "manager"
    },
    {
      name: "Colaborador",
      rules: [...rules.collaborator],
      tag: "collaborator"
    }
  ])
}