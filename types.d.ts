import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction } from "discord.js"
import mongoose from "mongoose"

export interface SlashCommand {
    data: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction | ChatInputCommandInteraction) => void,

}

export interface Event {
    name: string,
    once: true | false,
    execute: (...args?) => void
}

export const enum WebSocketRequestType {
    GetServerName = "getservername",
    ChangeVolume = "changevolume",
    GetSong = "getsong",
    SkipSong = "skipsong",
    NextSong = "nextsong"
}

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, SlashCommand>
    }
}