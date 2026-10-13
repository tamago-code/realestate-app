-- 物件テーブル
create table public.properties (
  id bigint generated always as identity primary key,
  -- 登録したユーザー。クライアントから送らなくてもログイン中のユーザーIDが入る
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 100),
  rent integer not null check (rent >= 0),
  area text not null check (char_length(area) between 1 and 100),
  layout text not null check (char_length(layout) between 1 and 20),
  created_at timestamptz not null default now()
);

create index properties_user_id_idx on public.properties (user_id);

-- RLS を有効化(ポリシーで許可した操作以外はすべて拒否される)
alter table public.properties enable row level security;

-- ログインユーザーにのみテーブル操作権限を与える(未ログインの anon には与えない)
grant select, insert, update, delete on public.properties to authenticated;

-- auth.uid() を select で包むのは、行ごとではなくクエリごとに1回だけ評価させるため
create policy "自分の物件のみ表示できる"
  on public.properties for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "自分の物件としてのみ登録できる"
  on public.properties for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

-- with check で、他人の user_id への付け替えも防ぐ
create policy "自分の物件のみ編集できる"
  on public.properties for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "自分の物件のみ削除できる"
  on public.properties for delete
  to authenticated
  using ((select auth.uid()) = user_id);
