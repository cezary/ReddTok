'use client';

import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

import { MaterialSymbolsClearDayRounded, MdiAlert, MdiFire, MdiFormatVerticalAlignTop, MdiInformationSlabCircleOutline, MdiNewBox, MdiTrendingUp } from "@/components/icons"
import Link from "@/components/link"
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { MdiAlert, MdiFire, MdiFormatVerticalAlignTop, MdiInformationSlabCircleOutline, MdiNewBox, MdiTrendingUp } from "./icons"
import Link from "./link"
import { useUIStore } from "@/lib/stores/ui";
import { useSearchParams } from "next/navigation";

export function AppSidebar() {
  const searchParams = useSearchParams();
  const { setAlert } = useUIStore();

  function handleAboutClick() {
    setAlert({
      title: 'About',
      description: (
        <>
          {process.env.NEXT_PUBLIC_SITE_NAME} is a TikTok-like client for Reddit videos.
          <br />
          <br />
          Made by <a href='https://x.com/czarizard' className='text-white' target='_blank' rel='noreferrer'>@czarizard</a>.
          <br />
          <br />
          Source available on <a href='https://github.com/cezary/reddtok' className='text-white' target='_blank' rel='noreferrer'>GitHub</a>.
        </>
      )
    })
  }

  const handleLiveModeClick = useCallback(function handleLiveModeClick() {
    console.log('handleLiveModeClick', !live)
    setLive(!live);
  }, [live, setLive]);

  return (
    <Sidebar className='hidden'>
      <SidebarHeader className='flex flex-row'>
        <SidebarTrigger className='[&_svg]:size-8' />
        <Link href='/'>
          <h1 className='text-2xl font-bold'>{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-base'>Sort by</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton className='text-base' asChild isActive={searchParams.get('sort') === 'hot' || !searchParams.get('sort')}>
                <Link href='?sort=hot' className='flex flex-row items-center'>
                  <MdiFire className='inline-block text-4xl' />
                  <p className='ml-2'>Hot</p>
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton className='text-base' asChild isActive={searchParams.get('sort') === 'new'}>
                <Link href='?sort=new' className='flex flex-row items-center'>
                  <MdiNewBox className='inline-block text-4xl' />
                  <p className='ml-2'>New</p>
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton className='text-base' asChild isActive={searchParams.get('sort') === 'top'}>
                <Link href='?sort=top' className='flex flex-row items-center'>
                  <MdiFormatVerticalAlignTop className='inline-block text-4xl' />
                  <p className='ml-2'>Top</p>
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton className='text-base' asChild isActive={searchParams.get('sort') === 'rising'}>
                <Link href='?sort=rising' className='flex flex-row items-center'>
                  <MdiTrendingUp className='inline-block text-4xl' />
                  <p className='ml-2'>Rising</p>
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton className='text-base' asChild isActive={searchParams.get('sort') === 'controversial'}>
                <Link href='?sort=controversial' className='flex flex-row items-center'>
                  <MdiAlert className='inline-block text-4xl' />
                  <p className='ml-2'>Controversial</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel className='text-base'>App</SidebarGroupLabel>
            <SidebarMenuButton className='text-base flex flex-row items-center' onClick={handleAboutClick}>
              <MdiInformationSlabCircleOutline className='inline-block text-4xl' />
              <p className='ml-2'>About</p>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
